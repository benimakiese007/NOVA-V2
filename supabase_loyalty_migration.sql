-- Migration: Loyalty Points System

create table if not exists public.loyalty_points (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    points_balance integer default 0 not null,
    total_earned integer default 0 not null,
    tier text default 'BRONZE' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id)
);

-- Enable RLS
alter table public.loyalty_points enable row level security;

-- Policies
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'loyalty_points' AND policyname = 'Users can view their own loyalty points'
    ) THEN
        CREATE POLICY "Users can view their own loyalty points" ON public.loyalty_points FOR SELECT USING (auth.uid() = user_id);
    END IF;
END $$;

-- Trigger for new users
create or replace function public.handle_new_user_loyalty()
returns trigger as $$
begin
    insert into public.loyalty_points (user_id, points_balance, total_earned, tier)
    values (new.id, 0, 0, 'BRONZE')
    on conflict (user_id) do nothing;
    return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created_loyalty on auth.users;
create trigger on_auth_user_created_loyalty
    after insert on auth.users
    for each row execute procedure public.handle_new_user_loyalty();

-- Trigger for completed orders
create or replace function public.add_loyalty_points_on_order()
returns trigger as $$
declare
    points_to_add integer;
begin
    -- Assuming status 'delivered' means completed and should grant points
    if (new.status = 'delivered' or new.status = 'completed') and (old.status != 'delivered' and old.status != 'completed') then
        -- 1 point per 1000 FC
        points_to_add := floor(new.total_amount / 1000);
        
        insert into public.loyalty_points (user_id, points_balance, total_earned)
        values (new.user_id, points_to_add, points_to_add)
        on conflict (user_id) do update 
        set points_balance = loyalty_points.points_balance + points_to_add,
            total_earned = loyalty_points.total_earned + points_to_add,
            updated_at = now();
            
        -- Update tier if necessary
        update public.loyalty_points
        set tier = 
            case 
                when total_earned >= 100000 then 'PLATINUM'
                when total_earned >= 50000 then 'GOLD'
                when total_earned >= 10000 then 'SILVER'
                else tier
            end
        where user_id = new.user_id;
    end if;
    return new;
end;
$$ language plpgsql security definer;

-- Recreate trigger on orders
drop trigger if exists on_order_delivered_add_points on public.orders;
create trigger on_order_delivered_add_points
    after update of status on public.orders
    for each row execute procedure public.add_loyalty_points_on_order();

-- users TABLE
CREATE TABLE users(
    user_id serial PRIMARY KEY,
    email varchar(255) unique NOT NULL,
    password varchar(255) NOT NULL,
    CREATEd_at date DEFAULT current_date
);

--companies TABLE
CREATE TABLE companies(
    company_id serial PRIMARY KEY,
    company_admin_email varchar(50) unique NOT NULL,
    company_admin_password varchar(60) NOT NULL,
    company_ein varchar(9) NOT NULL --company employer identification number
);

--invite_codes TABLE
CREATE TABLE invite_codes(
    company_id serial REFERENCES companies(company_id),
    invite_code integer NOT NULL,
    employee_email varchar(50) unique NOT NULL
);

--employee_info TABLE
CREATE TABLE employee_info(
    company_id serial REFERENCES companies(company_id),
    employee_id serial PRIMARY KEY,
    full_name varchar(50) NOT NULL,
    employee_email varchar(50) NOT NULL,
    employee_password varchar(60) NOT NULL,
    employee_register_date date DEFAULT current_date,
    extern_employee_id integer
);

--department_info TABLE
CREATE TABLE department_info(
    company_id serial REFERENCES companies(company_id),
    department_id serial PRIMARY KEY,
    department_name varchar(50) NOT NULL,
    department_min_access_control_level smallint NOT NULL
);

--department_employee_info TABLE
CREATE TABLE department_employee_info(
    company_id serial NOT NULL REFERENCES companies(company_id),
    department_id serial NOT NULL REFERENCES department_info(department_id),
    employee_id serial NOT NULL REFERENCES employee_info(employee_id),
    access_control_level smallint NOT NULL
);

--product_categories TABLE
CREATE TABLE product_categories(
    company_id serial REFERENCES companies(company_id),
    department_id serial NOT NULL REFERENCES department_info(department_id),
    category_id integer PRIMARY KEY NOT NULL
);

--product_info TABLE
CREATE TABLE product_info(
    company_id serial NOT NULL REFERENCES companies(company_id),
    department_id serial NOT NULL REFERENCES department_info(department_id),
    category_id integer NOT NULL REFERENCES product_categories(category_id),
    product_sku integer PRIMARY KEY NOT NULL,
    product_name varchar(50),
    product_description text
);

--product_counts TABLE
CREATE TABLE product_counts(
    company_id serial NOT NULL REFERENCES companies(company_id),
    department_id serial NOT NULL REFERENCES department_info(department_id),
    category_id integer NOT NULL REFERENCES product_categories(category_id),
    product_sku integer NOT NULL REFERENCES product_info(product_sku),
    counted_by_employee serial NOT NULL REFERENCES employee_info(employee_id),
    count_date date DEFAULT current_date,
    count_time time DEFAULT current_time,
    on_hand_loose_unit_count integer,
    on_hand_tray_count integer,
    on_hand_case_count integer
);

--labor_access_control TABLE
CREATE TABLE labor_access_control(
    company_id serial NOT NULL REFERENCES companies(company_id),
    labor_min_access_control_level smallint NOT NULL
);

--employee_labor_info TABLE
CREATE TABLE employee_labor_info(
    company_id serial NOT NULL REFERENCES companies(company_id),
    employee_id serial NOT NULL REFERENCES employee_info(employee_id),
    hourly_wage money NOT NULL,
    access_control_level smallint NOT NULL
);

--time_punch_record TABLE
CREATE TABLE time_punch_record(
    company_id serial NOT NULL REFERENCES companies(company_id),
    employee_id serial NOT NULL REFERENCES employee_info(employee_id),
    shift_date date DEFAULT current_date,
    clock_in_time time,
    clock_out_time time,
    break_start_time time,
    break_end_time time
);

--cash_access_control TABLE
CREATE TABLE cash_access_control(
    company_id serial NOT NULL REFERENCES companies(company_id),
    department_id serial NOT NULL REFERENCES department_info(department_id),
    cash_min_access_control_level smallint NOT NULL
);

--cash_access_levels_by_department TABLE
CREATE TABLE cash_access_levels_by_department(
    company_id serial NOT NULL REFERENCES companies(company_id),
    department_id serial NOT NULL REFERENCES department_info(department_id),
    employee_id serial NOT NULL REFERENCES employee_info(employee_id),
    access_control_level smallint NOT NULL
);

--register_deposits_record TABLE
CREATE TABLE register_deposits_record(
    company_id serial NOT NULL REFERENCES companies(company_id),
    department_id serial NOT NULL REFERENCES department_info(department_id),
    employee_id serial NOT NULL REFERENCES employee_info(employee_id),
    deposit_id serial PRIMARY KEY NOT NULL,
    deposit_amount money NOT NULL,
    deposit_date date DEFAULT current_date,
    deposit_time time DEFAULT current_time
);

--safe_record TABLE
CREATE TABLE safe_record(
    company_id serial NOT NULL REFERENCES companies(company_id),
    department_id serial NOT NULL REFERENCES department_info(department_id),
    employee_id serial NOT NULL REFERENCES employee_info(employee_id),
    count_date date DEFAULT current_date,
    count_time time DEFAULT current_time,
    draws_in_dollars money,
    loans_in_dollars money,
    coin_change_in_dollars money,
    pennies_in_dollars money,
    nickels_in_dollars money,
    dimes_in_dollars money,
    quarters_in_dollars money,
    half_dollar_coins_in_dollars money,
    singles_in_dollars money,
    doubles_in_dollars money,
    fives_in_dollars money,
    tens_in_dollars money,
    twenties_in_dollars money,
    fifties_in_dollars money,
    hundreds_in_dollars money,
    over_under_base_dollars money,
    total_dollars money
);
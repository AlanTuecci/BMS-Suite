--schema_version TABLE
CREATE TABLE schema_version(
    version varchar(6) NOT NULL
);

--Current minimum supported backend version is v4.0
insert into schema_version values('5');

--company_info TABLE
CREATE TABLE company_info(
    company_id serial PRIMARY KEY,
    company_admin_email varchar(50) unique NOT NULL,
    company_admin_password varchar(60) NOT NULL,
    company_ein varchar(9) NOT NULL --company employer identification number
);

--invite_codes TABLE
CREATE TABLE invite_codes(
    company_id serial REFERENCES company_info(company_id),
    invite_code integer NOT NULL,
    employee_email varchar(50) unique NOT NULL
);

--employee_info TABLE
CREATE TABLE employee_info(
    company_id serial REFERENCES company_info(company_id),
    employee_id serial NOT NULL,
    full_name varchar(50) NOT NULL,
    employee_email varchar(50) NOT NULL,
    employee_password varchar(60) NOT NULL,
    employee_register_timestamp timestamp with time zone DEFAULT now(),
    extern_employee_id integer,
    PRIMARY KEY (company_id, employee_id)
);

--inventory_access_info TABLE
CREATE TABLE inventory_access_info(
    company_id serial NOT NULL,
    employee_id serial NOT NULL,
    access_control_level smallint DEFAULT 0,
    FOREIGN KEY (company_id, employee_id) REFERENCES employee_info (company_id, employee_id)
);

--product_info TABLE
CREATE TABLE product_info(
    company_id serial NOT NULL REFERENCES company_info(company_id),
    product_sku integer NOT NULL,
    product_name varchar(50),
    product_description text,
    PRIMARY KEY (company_id, product_sku)
);

--product_counts TABLE
CREATE TABLE product_counts(
    company_id serial NOT NULL,
    product_sku integer NOT NULL,
    product_count_id serial NOT NULL,
    employee_id serial NOT NULL,
    count_timestamp timestamp with time zone DEFAULT now(),
    on_hand_loose_unit_count integer,
    on_hand_tray_count integer,
    on_hand_case_count integer,
    FOREIGN KEY (company_id, employee_id) REFERENCES employee_info(company_id, employee_id),
    FOREIGN KEY (company_id, product_sku) REFERENCES product_info(company_id, product_sku),
    PRIMARY KEY (company_id, product_sku, product_count_id)
);

--employee_labor_info TABLE
CREATE TABLE employee_labor_info(
    company_id serial NOT NULL,
    employee_id serial NOT NULL,
    hourly_wage money NOT NULL,
    access_control_level smallint DEFAULT 0,
    FOREIGN KEY (company_id, employee_id) REFERENCES employee_info(company_id, employee_id)
);

--time_punch_record TABLE
CREATE TABLE time_punch_record(
    company_id serial NOT NULL,
    employee_id serial NOT NULL,
    shift_id serial NOT NULL,
    clock_in_timestamp timestamp with time zone DEFAULT now(),
    clock_out_timestamp timestamp with time zone DEFAULT now(),
    break_start_timestamp timestamp with time zone DEFAULT now(),
    break_end_timestamp timestamp with time zone DEFAULT now(),
    FOREIGN KEY (company_id, employee_id) REFERENCES employee_info(company_id, employee_id),
    PRIMARY KEY (company_id, employee_id, shift_id)
);

--cash_access_info TABLE
CREATE TABLE cash_access_info(
    company_id serial NOT NULL,
    employee_id serial NOT NULL,
    access_control_level smallint DEFAULT 0,
    FOREIGN KEY (company_id, employee_id) REFERENCES employee_info(company_id, employee_id)
);

--register_deposits_record TABLE
CREATE TABLE register_deposits_record(
    company_id serial NOT NULL,
    depositor_employee_id serial NOT NULL,
    depositee_employee_id serial NOT NULL,
    deposit_id serial NOT NULL,
    extern_deposit_id integer,
    deposit_amount money NOT NULL,
    deposit_timestamp timestamp with time zone DEFAULT now(),
    FOREIGN KEY (company_id, depositor_employee_id) REFERENCES employee_info(company_id, employee_id),
    FOREIGN KEY (company_id, depositee_employee_id) REFERENCES employee_info(company_id, employee_id),
    PRIMARY KEY (company_id, deposit_id)
);

--safe_record TABLE
CREATE TABLE safe_record(
    company_id serial NOT NULL,
    employee_id serial NOT NULL,
    count_id serial NOT NULL,
    count_timestamp timestamp with time zone DEFAULT now(),
    draws money,
    loans money,
    coin_change money,
    pennies money,
    nickels money,
    dimes money,
    quarters money,
    singles money,
    doubles money,
    fives money,
    tens money,
    twenties money,
    fifties money,
    hundreds money,
    total money,
    PRIMARY KEY (company_id, count_id),
    FOREIGN KEY (company_id, employee_id) REFERENCES employee_info(company_id, employee_id)
);
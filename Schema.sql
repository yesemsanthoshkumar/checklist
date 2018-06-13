create table AppUser (
    ID serial primary key,
    FirstName varchar(50),
    LastName varchar(50),
    UserName varchar(50),
    Email varchar(100),
    Status integer default 200
);

create table UserChecklist (
    ID serial primary key,
    Usr integer references AppUser (ID),
    ChecklistName varchar(100),
    Status integer default 200
);

create table Tasks (
    ID serial primary key,
    Checklist integer references UserChecklist (ID),
    Name varchar(100),
    Description text,
    Status integer default 200
);

create table DoneChecklist (
    ID serial primary key,
    Checklist integer references UserChecklist (ID),
    Description text,
    DoneTime timestamp with time zone default now(),
    Status integer default 200
);

create table DoneTasks (
    ID serial primary key,
    Checklist integer references DoneChecklist (ID),
    Task integer references Tasks (ID),
    Status integer default 200
);

-- insert into appuser(firstname, lastname, email, username)
-- values('santhosh kumar', 'm', 'yesemsanthoshkumar@gmail.com', 'yesemsanthoshkumar');

-- insert into UserChecklist(usr, checklistname)
-- values(1, 'Travel');

-- insert into tasks(Checklist, name, Description)
-- values (1, 'phone', 'Along with headphones'),
-- (1, 'laptop', 'along with charger'),
-- (1, 'water bottle', 'bovonto if desired');

-- Model Name: azehagowa

-- Create a new database

CREATE DATABASE FullStackModel;



-- Switch to the new database

USE FullStackModel;



-- Create a Users table

CREATE TABLE Users (

&nbsp;   UserID INT IDENTITY(1,1) PRIMARY KEY,

&nbsp;   Username NVARCHAR(50) NOT NULL UNIQUE,

&nbsp;   PasswordHash NVARCHAR(255) NOT NULL,

&nbsp;   Email NVARCHAR(100) NOT NULL UNIQUE,

&nbsp;   CreatedAt DATETIME DEFAULT GETDATE()

);



-- Create a Roles table

CREATE TABLE Roles (

&nbsp;   RoleID INT IDENTITY(1,1) PRIMARY KEY,

&nbsp;   RoleName NVARCHAR(50) NOT NULL UNIQUE,

&nbsp;   CreatedAt DATETIME DEFAULT GETDATE()

);



-- Create a UserRoles table (many-to-many relationship between Users and Roles)

CREATE TABLE UserRoles (

&nbsp;   UserRoleID INT IDENTITY(1,1) PRIMARY KEY,

&nbsp;   UserID INT NOT NULL,

&nbsp;   RoleID INT NOT NULL,

&nbsp;   AssignedAt DATETIME DEFAULT GETDATE(),

&nbsp;   FOREIGN KEY (UserID) REFERENCES Users(UserID),

&nbsp;   FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)

);



-- Create a Permissions table

CREATE TABLE Permissions (

&nbsp;   PermissionID INT IDENTITY(1,1) PRIMARY KEY,

&nbsp;   PermissionName NVARCHAR(100) NOT NULL UNIQUE,

&nbsp;   CreatedAt DATETIME DEFAULT GETDATE()

);



-- Create a RolePermissions table (many-to-many relationship between Roles and Permissions)

CREATE TABLE RolePermissions (

&nbsp;   RolePermissionID INT IDENTITY(1,1) PRIMARY KEY,

&nbsp;   RoleID INT NOT NULL,

&nbsp;   PermissionID INT NOT NULL,

&nbsp;   AssignedAt DATETIME DEFAULT GETDATE(),

&nbsp;   FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),

&nbsp;   FOREIGN KEY (PermissionID) REFERENCES Permissions(PermissionID)

);



-- Insert sample data into Roles

INSERT INTO Roles (RoleName) VALUES ('Admin'), ('User'), ('Guest'), ('BillingAdmin');



-- Insert sample data into Permissions

INSERT INTO Permissions (PermissionName) VALUES ('Read'), ('Write'), ('Delete');



-- Grant all permissions to user elpmodel

-- Ensure the login exists at the server level

IF NOT EXISTS (SELECT 1 FROM sys.server\_principals WHERE name = 'elpmodel')

BEGIN

&nbsp;   CREATE LOGIN \[elpmodel] WITH PASSWORD = 'Slaytune11$';

END



-- Ensure the user exists in the database

USE FullStackModel;

IF NOT EXISTS (SELECT 1 FROM sys.database\_principals WHERE name = 'elpmodel')

BEGIN

&nbsp;   CREATE USER \[elpmodel] FOR LOGIN \[elpmodel];

END



GRANT CONTROL ON DATABASE::FullStackModel TO \[elpmodel];



-- Assign elpmodel as a BillingAdmin

DECLARE @UserID INT;

DECLARE @RoleID INT;



-- Assuming elpmodel is already in the Users table

SELECT @UserID = UserID FROM Users WHERE Username = 'elpmodel';

SELECT @RoleID = RoleID FROM Roles WHERE RoleName = 'BillingAdmin';



IF @UserID IS NOT NULL AND @RoleID IS NOT NULL

BEGIN

&nbsp;   INSERT INTO UserRoles (UserID, RoleID) VALUES (@UserID, @RoleID);

END



-- Deploy the model to local disk

BACKUP DATABASE FullStackModel 

-- To safely remove obsolete backup files, use a SQL Agent job or an external script with appropriate permissions.

-- Example: Set up a scheduled task or maintenance plan outside of SQL Server to delete old backup files.

WITH FORMAT, INIT, NAME = 'FullStackModel Backup';



-- Fast backup and sync removing obsolete files

-- Backup the database

BACKUP DATABASE FullStackModel 

TO DISK = 'C:\\SQLBackups\\FullStackModel\_FastSync.bak' 

WITH DIFFERENTIAL, INIT, NAME = 'FullStackModel Fast Sync Backup';



-- Remove obsolete backup files

DECLARE @BackupPath NVARCHAR(255) = 'C:\\SQLBackups';

DECLARE @FilePattern NVARCHAR(255) = 'FullStackModel\_\*.bak';



EXEC xp\_cmdshell('forfiles /P "' + @BackupPath + '" /M "' + @FilePattern + '" /D -7 /C "cmd /c del @path"');

-- Publish the database to elparadisogonzalo.com

-- To publish the database, use sqlpackage or a secure deployment tool from your terminal or CI/CD pipeline:

-- Example command (run outside SQL Server Management Studio):

-- sqlpackage /Action:Publish /SourceFile:"C:\\SQLBackups\\FullStackModel.bak" /TargetServerName:"elparadisogonzalo.com" /TargetDatabaseName:"FullStackModel"

EXEC xp\_cmdshell @PublishCommand;



-- The elpmodel table stores metadata about application instances or modules related to the FullStackModel project.

-- Each record represents a distinct app or component, identified by AppName.

CREATE TABLE elpmodel (

&nbsp;   AppID INT IDENTITY(1,1) PRIMARY KEY,

&nbsp;   AppName NVARCHAR(100) NOT NULL UNIQUE,

&nbsp;   CreatedAt DATETIME DEFAULT GETDATE()

);


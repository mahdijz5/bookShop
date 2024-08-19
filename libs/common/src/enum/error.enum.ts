export const ERROR = {
    INTERNAL_SERVER_ERROR: {
        key: 9000,
        value: 'Internal Server Error.',
    },
    NOT_FOUND: {
        key: 1999,
        value: 'Not found.',
    },
    ALREADY_EXISTS: {
        key: 1998,
        value: 'Already exists.',
    },

    TOO_MANY_REQUESTS: {
        key: 1997,
        value: 'Too Many Requests',
    },
    MONGO_INCORRECT_ID: {
        key: 1996,
        value: 'Incorrect mongo id!',
    },
    TYPEORM_INCORRECT_UUID: {
        key: 1995,
        value: 'Incorrect uuid!',
    },
    REFREENCE_ERROR: {
        key: 1996,
        value: 'There are some refrences to this table. ',
    },
    INVALID_CREDENTIALS: {
        key: 1000,
        value: 'Username, Email or Password are not correct.',
    },
    USER_NOTFOUND: {
        key: 1001,
        value: 'User not found.',
    },
    VERIFICATION_CODE_NOT_EXPIRED: {
        key: 1002,
        value: 'The verification code is not expired yet.',
    },
    INVALID_TOKEN: {
        key: 1003,
        value: 'Invalid token.',
    },
    TOKEN_EXPIRED: {
        key: 1004,
        value: 'Token expired',
    },
    ROLE_ACCESS_DENIED: {
        key: 1005,
        value: 'You dont have access to this role.',
    },
    JWT_NOTFOUND: {
        key: 1006,
        value: 'Authorization header not found.',
    },
    JWT_IS_NOT_VALID: {
        key: 1007,
        value: 'Authorization header is not valid.',
    },
    USER_ALREADY_EXISTS: {
        key: 1008,
        value: 'User is already exists.',
    },
    ROLE_NOTFOUND: {
        key: 1009,
        value: 'Role is not found.',
    },
    USER_EMAIL_ALREADY_VERIFIED: {
        key: 1010,
        value: 'User email is already verified.',
    },
    USERNAME_ALREADY_EXISTS: {
        key: 1011,
        value: 'User name is already exists.',
    },
    USER_EMAIL_ALREADY_EXISTS: {
        key: 1012,
        value: 'User email is already exists.',
    },
    ROUTE_ACCESS_DENIED: {
        key: 1013,
        value: "You don't have access this route.",
    },
    DO_NOT_HAVE_THIS_ROLE: {
        key: 1014,
        value: "You don't have access to this role.",
    },
    ROLE_IN_USE: {
        key: 1015,
        value: "Role is in use.",
    },
    ROLE_ALREADY_ALLOCATED: {
        key: 1016,
        value: 'You already have this role.',
    },
};

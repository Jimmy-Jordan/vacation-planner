from project.settings import *

MIDDLEWARE += [
    'utils.middleware.FlushWare',
]

LOGIN_SUCCESS_URL = '/'
#Insert Login success url here
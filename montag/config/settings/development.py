from montag.config.settings.base import *

from montag.config.config import *
SECRET_KEY = LOCAL_SECRET_KEY

DEBUG = True
INSTALLED_APPS += (
    'debug_toolbar', # and other apps for local development
)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'montag',
    }
}

from montag.config.settings.base import *

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
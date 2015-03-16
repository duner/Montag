from montag.config.settings.base import *

from montag.config.config import *
SECRET_KEY = LOCAL_SECRET_KEY

DEBUG = False
INSTALLED_APPS += (
    # other apps for production site
)

import dj_database_url
DATABASES['default'] =  dj_database_url.config()

# Honor the 'X-Forwarded-Proto' header for request.is_secure()
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers
ALLOWED_HOSTS = ['*']

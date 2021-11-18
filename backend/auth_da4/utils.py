from django.contrib.auth.models import User

OK = 0
USERNAME_ALREADY = 1
EMAIL_ALREADY = 2

class ExistUser:

    def __init__(self, username, email):
        self.username = username
        self.email = email
    

    def is_email_exists(self):
        return User.objects.filter(email=self.email).exists()
    

    def is_username_exists(self):
        return User.objects.filter(username=self.username).exists()
    

    def get_exists_code(self):
        if self.is_username_exists():
            return USERNAME_ALREADY
        if self.is_email_exists():
            return EMAIL_ALREADY
        return OK


    def exists_code(self):
        return self.get_exists_code()

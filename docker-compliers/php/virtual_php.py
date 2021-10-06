import os

from subprocess import Popen, PIPE
from string import ascii_lowercase, digits
from random import choices

PHP_CODE_PATH = "php_tmp/code/"

class VirtualPHP:

    def __init__(self):
        self.filename = PHP_CODE_PATH + "hello.php" # default
        self.filename_length = 10


    def create_file(self, code):
        self.filename = PHP_CODE_PATH + ''.join(choices(ascii_lowercase + digits, k=self.filename_length)) + '.php'
        f = open(self.filename, "w")
        f.write(code)
        f.close()


    def run(self):
        p = Popen(['php', self.filename], stdin=PIPE, stdout=PIPE, stderr=PIPE)
        output, err = p.communicate(b"Run php scripts...")
        output, err = output.decode(), err.decode()
        return output, err
    

    def cleanup(self):
        if os.path.exists(self.filename):
            os.remove(self.filename)
        else:
            print("The file does not exist")

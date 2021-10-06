import os

from subprocess import TimeoutExpired, run
from string import ascii_lowercase, digits
from random import choices
from time import time

PHP_CODE_PATH = "php_tmp/code/"
RUN_TIME_OUT = 4

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
        begin = time()
        try:
            result = run(['php', self.filename], capture_output=True, text=True, timeout=RUN_TIME_OUT)
            output, err = result.stdout, result.stderr
        except TimeoutExpired:
            output, err = "", "Error: timeout"
        end = time()
        t = str(round(end - begin, 6)) + 's'
        return output, err, t
    

    def cleanup(self):
        if os.path.exists(self.filename):
            os.remove(self.filename)
        else:
            print("The file does not exist")

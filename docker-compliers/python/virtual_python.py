import os
import shutil

from subprocess import TimeoutExpired, run
from string import ascii_lowercase, digits
from random import choices
from time import time

CODE_PATH = "python_tmp/code/"
CODE_EXT = ".py"
RUN_TIME_OUT = 6


class VirtualPython:
    def __init__(self, filename="main"):
        self.filename = filename + CODE_EXT
        self.mid_length = 10
        self.midpath = "".join(choices(ascii_lowercase + digits, k=self.mid_length))

    def create_mid_folder(self):
        os.mkdir(CODE_PATH + self.midpath)

    def create_file(self, code):
        self.create_mid_folder()
        self.filename = CODE_PATH + self.midpath + "/" + self.filename
        with open(self.filename, "w") as f:
            f.write(code)

    def run(self):
        begin = time()
        try:
            result = run(
                ["python", self.filename],
                capture_output=True,
                text=True,
                timeout=RUN_TIME_OUT,
            )
            output, err = result.stdout, result.stderr
        except TimeoutExpired:
            output, err = "", "Error: timeout"
        end = time()
        t = str(round(end - begin, 6)) + "s"
        return output, err, t

    def cleanup(self):
        if os.path.exists(self.filename):
            shutil.rmtree(CODE_PATH + self.midpath)
        else:
            print("The file does not exist")

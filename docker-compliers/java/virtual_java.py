import os
import shutil

from subprocess import TimeoutExpired, run
from string import ascii_lowercase, digits
from random import choices
from time import time

CODE_PATH = "tmp/code/"
CODE_EXT = ".java"
RUN_TIME_OUT = 4


class VirtualJava:
    root_path = os.getcwd()

    def __init__(self, name="Main"):
        self.filename = name + CODE_EXT
        self.fileclass = name
        self.mid_length = 10
        self.midpath = "".join(choices(ascii_lowercase + digits, k=self.mid_length))

    def __create_mid_folder(self):
        os.mkdir(CODE_PATH + self.midpath)

    def create_file(self, code):
        self.__create_mid_folder()
        self.filename = CODE_PATH + self.midpath + "/" + self.filename
        with open(self.filename, "w") as f:
            f.write(code)

    def __complie(self):
        result = run(
            ["javac", self.filename],
            capture_output=True,
            text=True,
            timeout=RUN_TIME_OUT,
        )
        err = result.stderr
        return err

    def __ch_to_src(self):
        """Change workdir to java sources"""
        os.chdir(CODE_PATH + self.midpath)

    def __ch_to_root(self):
        """Change workdir to root"""
        os.chdir(self.root_path)

    def run(self):
        err = self.__complie()
        if err:
            return "", err, ""
        self.__ch_to_src()
        begin = time()
        try:
            result = run(
                ["java", self.fileclass],
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
        self.__ch_to_root()
        if os.path.exists(self.filename):
            shutil.rmtree(CODE_PATH + self.midpath)
        else:
            print("The file does not exist")

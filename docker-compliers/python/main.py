from fastapi import FastAPI
from pydantic import BaseModel
from virtual_python import VirtualPython


app = FastAPI()


class PythonCode(BaseModel):
    code: str


@app.get("/")
def index():
    return {"description": "Đây là python shell"}


@app.post("/")
def run_code(pycode: PythonCode):

    py = VirtualPython()
    py.create_file(pycode.code)
    out, err, t = py.run()
    py.cleanup()

    return {"out": out, "err": err, "time": t}

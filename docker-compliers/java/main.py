from fastapi import FastAPI
from pydantic import BaseModel
from virtual_java import VirtualJava


app = FastAPI()


class JavaCode(BaseModel):
    code: str


@app.get("/")
def index():
    return {"description": "Đây là java complier <Mặc định file: Main.java>"}


@app.post("/")
def run_code(javacode: JavaCode):

    java = VirtualJava()
    java.create_file(javacode.code)
    out, err, t = java.run()
    java.cleanup()

    return {"out": out, "err": err, "time": t}

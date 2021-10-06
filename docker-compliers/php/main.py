from fastapi import FastAPI
from pydantic import BaseModel
from virtual_php import VirtualPHP


app = FastAPI()


class PHPCode(BaseModel):
    code: str


@app.get('/')
def index():
    return {"description": "Day la php complier"}


@app.post('/')
def run_code(phpcode: PHPCode):

    php = VirtualPHP()
    php.create_file(phpcode.code)
    out, err = php.run()
    php.cleanup()
    
    return ({"out": out, "err": err})

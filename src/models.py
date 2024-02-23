from pydantic import BaseModel



class SignUpSchema(BaseModel):
    email:str
    password:str

    class Config:
        schema_extra = {
            "example":{
                "email":"wenkylix@ymail.com",
                "password":"1234abcd"
            }
        }


class LoginSchema(BaseModel):
    email:str
    password:str
    
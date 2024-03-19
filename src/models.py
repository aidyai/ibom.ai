from pydantic import BaseModel



class SignUpSchema(BaseModel):
    full_name: str
    email: str
    password: str

    class Config:
        schema_extra = {
            "example":{
                "Idara Smauel Osu"
                "email":"wenkylix@ymail.com",
                "password":"1234abcd"
            }
        }


class LoginSchema(BaseModel):
    email:str
    password:str
    
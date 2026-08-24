import type { Request, Response } from "express"
import { ExistingUserError, ValidationError } from "../errors/error.classes.js"
import { createUserService } from "../services/auth.service.js";
import { authenticateService } from "../services/auth.service.js";


export async function createUserController(
    req: Request,
    res: Response
) {
    
    const { username, email, password } = req.body;

    try {
        const newUser = await createUserService(username, email, password)

        return res.status(201).json({
            message: "User created with sucess",
            newUser
        })

    } catch (err: any){

        console.log(err)
        if (err instanceof ExistingUserError) {
            return res.status(403).json({
                message: "User already exists"
            })
        }
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

export async function authenticateController(
  req: Request,
  res: Response
) {
  const { email, password } = req.body;

  try{
    const result = await authenticateService(email,password);

    return res.status(200).json({
        message: "success",
        result
    })

  } catch(err: any){
    if (err instanceof ExistingUserError || err instanceof ValidationError){
        return res.status(401).json({
            message: "Invalid data"
        })
    }
    return res.status(500).json({
    message: "Server intenal error"
    })
  }

}
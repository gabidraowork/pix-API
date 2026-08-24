import type { Request, Response, json } from "express";
import { createPixKeyService, deletePixKeyService} from "../services/pixKey.service.js";
import { ExistingPixKeyError, ExistingUserError } from "../errors/error.classes.js";

export async function createPixKeyController(req: Request, res: Response){

    const {value, type} = req.body
    const { id } = req.user

    try {
        const newPixKey = await createPixKeyService(value, type, id);

        return res.status(201).json({
            message: "Pix key created with success",
            newPixKey
        })

    } catch (err : any) {

        console.log(err);

        if(err instanceof ExistingPixKeyError){
            return res.status(403).json({
            message: "Pix key already exists"
            })
        }
        if (err instanceof ExistingUserError) {
            return res.status(403).json({
            message: "Account was not setted"
            })
        }

        return res.status(500).json({
            message: "Internal server error"
        })
    }

}

export async function deletePixKeyController(req: Request, res: Response) {

    const {value} = req.body
    const { id } = req.user

    try {
        const deletedKey = await deletePixKeyService(value, id);

        return res.status(200).json({
            message: "resource deleted successfully",
            deletedKey
        })
    } catch(err: any){
        console.log(err);

        if (err instanceof ExistingPixKeyError){
            return res.status(403).json({
                message: "Pix key don't exists"
            })
        }
        
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
import { Request, Response } from "express";
import registerClientsService from "../services/clients/RegisterClients.service";
import getClientsService from "../services/clients/GetClients.service";
import getSpecificService from "../services/clients/GetSpecific.service";
import editClientService from "../services/clients/EditClient.service";
import deleteClientService from "../services/clients/DeleteClient.service";
import { IClientCreate, IClientUpdate } from "../interfaces/clients";

export async function registerClientsController(req: Request, res: Response): Promise<Response> {
    const { id } = req.user as { id: string }
    const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        document: req.body.document,
    } satisfies IClientCreate;
    const client = await registerClientsService(id, data);
    return res.status(201).json(client);
}

export async function getClientsController(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const clients = await getClientsService(id);
    return res.status(200).json(clients);
}

export async function getSpecificController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const client = await getSpecificService(id);
    return res.status(200).json(client);
}

export async function editClientController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    } satisfies IClientUpdate;
    const client = await editClientService(id, data);
    return res.status(200).json(client);
}

export async function deleteClientController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await deleteClientService(id);
    return res.status(204).send();
}
import { Request, Response} from "express";
import Team from "../models/team";
import User from "../models/user";

const getTeams = async (req: Request, res: Response) => {
    try{
        const results = await Team.find({}).populate('users');
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

const getTeam = async (req: Request, res: Response) => {
    try{
        const results = await Team.find({"_id": req.params.id}).populate('users');
        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}

/*const addUserToTeam = async (req: Request, res: Response) => {
    let teamName = req.params.teamName;
    console.log(req.params.id);
    console.log(req.params.teamName);
    try{
        const results = await User.findOne({"_id": req.params._id});
        const team = new Team ({ "name": teamName, "User": results});
        await team.save();

        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}*/

const addUserToTeam = async (req: Request, res: Response) => {
    let teamName = req.params.teamName;
    
    let userId = req.body.id; 
    let userName = req.body.name; 
    let userEmail = req.body.email;
    let userPhone = req.body.phone;
    let userPassword = req.body.password;
    
    let s = await User.findOne({name: userName}); 
    if(!s) { 
        let user = new User({ "name": userName, "email": userEmail, "phone": userPhone, "password": userPassword});

        await user.save().then((data) => { 
            s = data;  
        });
    } 
    await Team.updateOne({"name": teamName}, {$addToSet: {users: s?._id}}).then(data => { 
        if (data.nModified == 1) { 
            res.status(201).send({message: 'User added successfully'}); 
        } else { 
            res.status(409).json('User already exists!!!') 
    } }).catch((err) => { 
        console.log("error ", err); 
        res.status(500).json(err); 
    }); 
}

const addTeam = async (req: Request, res: Response) => {
    const team = new Team({
        "name": req.body.name,
        "users": []
    });
    team.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    })
}

export default { getTeams, getTeam, addUserToTeam, addTeam };
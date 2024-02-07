## WHAT I AM USING IN THIS BACKEND FILE:

Tech Stack: nextJs, Typescript, Tailwind Css, Expressjs, Nodejs, Mongodb, redux, shadcn
what i installed in backend server npm: bcrypt, jwt, dotenv,mongoose,express,

1. Create two folders backend and frontend

2. Create a nextJs + typescript file using "npx create-next-app@latest" in frontend folder, install tailwind in it.

3. Create server.js in backend to create a basic server and check is it working.

--- created 4 schemas as of now user,post,message,likes,comment.

--- created routes folder inside that user.routes.js file which has 2 routes signup and login which looks like this
const router = express.Router();
router.post('/signup',signUpController)-(it is a function which is in controllers ) and in controller we defined if
request come on signup then:

        -it will check whether all the fields that are required true are they available or not : username, email, password
         if not then send status 401 with json message fill all the fields.
        -then it will check if the email is already registered we will show error with registered email and it will be like this
         import User from './models/user.model.js'

) this is the signUpController function
export const signUpController = async(req,res)=>{
const {username, email, password}= req.body;
try{
if(!email || !password ||!username){
res.status(401).json({message: "Please fill all inputs"});
}
const isRegistered = await User.findOne({email});
if(isRegistered){
res.status(401).json({message:"This email is already registered"});
}

         const hashedPassword= await bcrypt.hash(password, 10);
         //to create a new user in the User
         const newUser= new User({
            username,
            email,
            password:hashedPassword
         });

         await newUser.save();

        res.status(201).json({message:"The User has successfully registered"});
        }
        catch(error){
            console.error(error);
            res.status(500).json({message:"Internal Server Error"});
        }
     }

) this is loginController function:
export const loginController = async (req,res)=>{
const {username,password}=req.body;

        try{
            if(!username || !password){
                res.status(400).json({message: "Please fill all inputs"});
            }

            const user = await User.findOne('username');
            if(!user){
                res.status(401).json({message: "No User found"});
            }

            const isValidPass = await bcrypt.compare(password,user.password);
            if(!isValidPass){
                res.status(401).json({"Invalid Password"});
            }
           const token = jwt.sign({userId:user._id},'accesstoken',{expiredIn:'7d'});
           res.status(200).json({token});
        }catch(err){
            console.error(err);
            res.status(500).json({message: "Internal Error" });
        }
      }

--- while in index.js file we used dotenv file

--- connected new atlas database this file index.js i used url in .env file and used like
: mongoose.connect(process.env.DATABASE_URL,);
const db = mongoose.connect;

//by using on we database will stay connected and stay executed until it is not successfully connects
db.on('error',(error)=>{
console.log("could not connect to the database" , error);
})

    db.once('open',()=>{
        console.log("Database has connected to mongodb);
    })

--- used middleware app.use(express.json());

     import userRoute from './routes/user.routes.js';

--- used middleware app.use('/api/v1/user,userRoute);

-----------------------------------------Done creating User registration and user login with jwt token-----------------------------------

# next day: what i changed

--- i created a new db folder we connected database inside a function which is an async function., all the files are now
under src folder.

---i am creating post controller now i have to check first is the user logged in or not if not show error if yes then go for
post

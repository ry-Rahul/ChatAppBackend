const corsOptions = {
        origin: ["http://localhost:5173", process.env.CLIENT_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,

};

const COOKIE_TOKEN = "chattApp";

export { corsOptions , COOKIE_TOKEN}
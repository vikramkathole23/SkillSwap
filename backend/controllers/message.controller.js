


export const sendMessage = async (req, res) => {

    try {
        
    } catch (error) {
        console.log("Error in sendMessage", error);
    res.status(500).json({ error: "Internal server error" }); 
    }

};


export const getMessage = async (req, res) => {
};
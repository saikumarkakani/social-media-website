
//inport express
let express = require("express");
//import db_con file
let db_con = require("./db_con");
//import cors
let cors = require("cors");
//import express-formidable
let formidable = require("express-formidable");
//importnodemailer
let nodemailer = require('nodemailer');


//create a object
let app = express();
//use cors
app.use(cors());
//use express-formidable
app.use(formidable());
//use nodemailer



//for connection
app.listen(4003);


//for user signup get data
app.get("/getsignup", async (req, res) => {
    let data = await db_con.getSignupdata();
    res.write(JSON.stringify(data));
    res.end();
})
//for user signup save data 
// app.post("/savesignup", async (req, res) => {
//     let data = await db_con.saveSignupdata(req.fields.email, req.fields.username, req.fields.password,req.fields.profileimg);
//     res.redirect("http://localhost:3000/");
//     res.end();

// });



//for user signup save data 
app.post("/savesignup", async (req, res) => {
    let data = await db_con.saveSignupdata(req.fields.email, req.fields.username, req.fields.password);
    res.redirect("http://localhost:3000/login");
    res.end();

});


// Save for insta post story 
app.post("/savepoststory", async (req, res) => {
  let { userid, storyimg, story} = req.fields;
     await db_con.SavepostStoryData(userid, storyimg, story);
    res.redirect("http://localhost:3000/userprofile");
    res.end();

});
//get for insta post story
app.get("/getinstastory", async (req, res) => {
    let data = await db_con.getInstastoryData();
    res.write(JSON.stringify(data));
    res.end();
})


// Save for upload  user profile  based on id in profile component
app.post("/saveuserprofile", async (req, res) => {
    let {profileid,profileimage} = req.fields;
       await db_con.SaveprofilpicData(profileid,profileimage);
      //res.redirect("http://localhost:3000/userprofile");
      res.end();
  });
 


// upload  user profile get in prifle component  based on id
app.get("/getuserprofile/:id", async (req, res) => {
    const id = req.params.id; 
    try {
        let data = await db_con.getUserProfileData(id); // Call the function to get user profile data by user ID
        res.json(data); // Return the user profile data as JSON
    } catch (error) {
        console.error("Error fetching user profile data:", error);
        res.status(500).json({ error: "Internal server error" }); // Return an error response
    }
});


app.get("/searchprofile", async (req, res) => {
    try {
        let data = await db_con.getsearchprofilesData();
        res.json(data);
    } catch (error) {
        console.error("Error fetching profile data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});






// Save api  for profile update on profile component
app.post("/updateuserprofile", async (req, res) => {
    let {profileid,profileimage} = req.fields;
       await db_con.updateProfilePicData(profileid,profileimage);
      //res.redirect("http://localhost:3000/userprofile");
      res.end();
});




//get userposts Based on by Ids
app.get("/getprofile/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let data = await db_con.getUserpostsbyIdData(id);
        res.json(data);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

})


app.get("/getuserposts", async(req,res)=>{
    let data = await db_con.getuserpostsData();
    res.write(JSON.stringify(data));
    res.end();
})



//add storys in home component by using post api 
app.post("/addstory", async (req, res) => {
    let {cid,simg} = req.fields;
       await db_con.AddstorysData(cid,simg);
    res.redirect("http://localhost:3000/home");
      res.end();
  
  });
  //add storys in home component by using post api based on ids
  app.get("/getaddstory/:id", async (req, res) => {
    const cid = req.params.id; 
    try {
        let data = await db_con.getAddstoryData(cid); // Call the function to get user profile data by user ID
        res.json(data); // Return the user profile data as JSON
    } catch (error) {
        console.error("Error fetching user profile data:", error);
        res.status(500).json({ error: "Internal server error" }); // Return an error response
    }
});

  //add storys in home component by using post api based on all userids

  app.get("/getallstories", async (req, res) => {
    try {
        let data = await db_con.getAllStoriesData(); // Call the function to get all user stories
        res.json(data); // Return the stories as JSON
    } catch (error) {
        console.error("Error fetching stories:", error);
        res.status(500).json({ error: "Internal server error" }); // Return an error response
    }
});



//for searching product item using post api
app.post("/searchPosts", async(req,res)=>{
    let data = await db_con.searchPostsData(req.fields.username);
    res.write(JSON.stringify(data));
    res.end();

})

//for searching user profile using post api
app.get("/getsearchprofile/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let data = await db_con.getUserpostsbyIdData(id);
        res.json(data);
    } catch (error) {
        console.error("Error fetching profile data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});






//serach user profile 

// Get user posts by ID (profile details)
app.get("/getsearchprofile/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let data = await db_con.searchprofilename(id);
        res.json(data.customerposts);
    } catch (error) {
        console.error("Error fetching profile data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get user profile details by ID (custom route)
app.get("/getprofiles/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let data = await db_con.searchprofilename(id);
        res.json(data.customerposts);
    } catch (error) {
        console.error("Error fetching profile details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get custom stories by user ID
app.get("/getcustmstorie/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let data = await db_con.searchstoriesget(id);
        res.json(data.stories);
    } catch (error) {
        console.error("Error fetching custom stories:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Get custom profile by user ID
app.get("/getcustmprofile/:id", async (req, res) => {
    const id = req.params.id;
    try {
        let data = await db_con.getCustomProfileData(id);
        res.json(data.profilepic);
    } catch (error) {
        console.error("Error fetching custom profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



//for user forgot password
app.post("/forgotpassword", async (req, res) => {
    const { email } = req.fields;
    try {
        let signupdata = await db_con.getUserByEmaildata(email);
        if (signupdata) {
            // Send email (simplified, normally you wouldn't send plain passwords)
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'saikumar.kakani61@gmail.com',
                    pass: 'zjtm skep zpbe orck'
                }
            });
            let mailOptions = {
                from: 'saikumar.kakani61@gmail.com',
                to: email,
                subject: 'Forgot Password',
                text: `Your password : ${ signupdata.password }`
        };
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Password sent to your email.' });
    } 
        else {
        res.status(404).json({ message: 'Email not found.' });
    }
} 
    catch (err) {
    console.error('Error during forgot password process:', err);
    res.status(500).json({ message: 'Server error.' });
}

});


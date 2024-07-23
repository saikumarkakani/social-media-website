//import mysql2
const mysql = require("mysql2");

//create a connection
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sai@1234',
    database: 'instashare'
});

//create a function to start connection
function startConnection() {
    con.connect((err) => {
        if (err) throw err;
        console.log("connected")
    })
}

//get api for singup data 
async function getSignup() {
    startConnection();
    let data = await con.promise().query("select *from signupdata");
    return data[0];
}


//save singup data
async function saveSignup(email, username, password) {
    startConnection();
    let data = await con.promise().query(`insert into signupdata(email,username,password) values("${email}","${username}","${password}")`);
    return data[0];
}

//post for insta post story
async function SavepostStory(userid, storyimg, story) {
    startConnection();
    let data = await con.promise().query('insert into posts(userid, storyimg, story)values(?,?,?)', [userid, storyimg, story])
    return data[0];
}

//save api for upload userprofile pic on profile component
async function Saveprofilepic(profileid, profileimage) {
    startConnection();
    let data = await con.promise().query(`insert into profile(profileid,profileimage)values(?,?)`, [profileid, profileimage]);
    return data[0];
}

// upload  user profile  based on id  userprofile component
const getUserProfile = async (profileid) => {
    const query = `
      select i.profileimage, i.profileid
      from signupdata as s
      join profile as i on s.id = i.profileid
      where i.profileid = ?
    `;
    const [rows] = await con.promise().query(query, [profileid]);
    return rows;
};


//Update profile image
async function updateProfilePic(profileid, profileimage) {
    startConnection();
    let data = await con.promise().query(`update profile set profileimage = "${profileimage}" where profileid = ${profileid}`);
    return data[0];
}


//add user storys  save 
async function Addstorys(cid, simg) {
    startConnection();
    let data = await con.promise().query(`insert into storys(cid,simg)values(?,?)`, [cid, simg]);
    return data[0];
}
//get user storys based on ids
const getAddstorys = async (cid) => {
    const query = `
      SELECT u.username, s.simg, s.cid
FROM signupdata AS u
JOIN storys AS s ON u.id = s.cid
WHERE s.cid = ?;
    `;
    const [rows] = await con.promise().query(query, [cid]);
    return rows;
};


// Function to get all user stories 
const getAllStories = async () => {
    const query = `
        SELECT u.username, s.simg, s.cid
        FROM signupdata AS u
        JOIN storys AS s ON u.id = s.cid;
    `;
    const [rows] = await con.promise().query(query);
    return rows;
};



//get api for insta post story homeinsta posts 
async function getInstastory() {
    startConnection();
    let data = await con.promise().query("select * from signupdata as s join posts as p on s.id = p.userid;");
    return data[0];
}

//get  userposts based on ids  userprofile component get posts images
async function getUserpostsbyId(id) {
    startConnection();
    let data = await con.promise().query(`select p.story , p.storyimg, p.userid,  s.email, s.username, s.id   from signupdata as s
    join posts as p on s.id=p.userid where p.userid = ${id};`);
    return data[0];
}



//get  userposts based on ids insta home upload posts
async function getUserposts() {
    startConnection();
    let data = await con.promise().query(`SELECT 
    s.username, 
    p.storyimg, 
    p.story,
    pr.profileimage 
FROM 
    signupdata s 
LEFT JOIN 
    posts p ON s.id = p.userid 
LEFT JOIN 
    profile pr ON s.id = pr.profileid;`);
    return data[0];
}





// Function to get customer by email
async function getUserByEmail(email) {
    let [rows] = await con.promise().query("select *from signupdata WHERE email = ?", [email]);
    return rows[0];
}


// Search post stories by username
async function searchPosts(username) {
    startConnection();
    let data = await con.promise().query(`SELECT s.username, p.*, pr.profileimage
    FROM signupdata AS s
    JOIN posts AS p ON s.id = p.userid
    JOIN profile AS pr ON s.id = pr.profileid
    WHERE s.username LIKE '${username}';`);
    return data[0];
}



//search for user profiles
// Search user profiles by username
// async function searchUserProfiles(username) {
//     startConnection();
//     let data = await con.promise().query(`SELECT 
//     s.username, 
//     pr.profileimage
// FROM 
//     signupdata AS s
// JOIN 
//     profile AS pr ON s.id = pr.profileid
// WHERE 
//     s.username LIKE '%${username}%';`); // Added % for partial match
//     return data[0];
// }




//search user profiles code

//search profile and username
async function getsearchprofiles() {
    startConnection();
    let data = await con.promise().query(`SELECT 
        s.id, 
        s.username, 
        pr.profileimage 
    FROM 
        signupdata s 
    LEFT JOIN 
        profile pr ON s.id = pr.profileid;`);
    return data[0];
}
async function searchprofilename(profileid) {
    const query = `
      SELECT p.story, p.storyimg, p.userid, s.email, s.username, s.id
      FROM signupdata AS s
      JOIN posts AS p ON s.id = p.userid
      WHERE p.userid = ?
    `;
    const [rows] = await con.promise().query(query, [profileid]);
    return { customerposts: rows }; // Wrap the result in an object with the expected property
}

async function searchstoriesget(cid) {
    const query = `
      SELECT u.username, s.simg, s.cid
      FROM signupdata AS u
      JOIN storys AS s ON u.id = s.cid
      WHERE s.cid = ?
    `;
    const [rows] = await con.promise().query(query, [cid]);
    return { stories: rows }; // Wrap the result in an object with the expected property
}

async function getCustomProfileData(profileid) {
    const query = `
      SELECT i.profileimage, i.profileid
      FROM signupdata AS s
      JOIN profile AS i ON s.id = i.profileid
      WHERE i.profileid = ?
    `;
    const [rows] = await con.promise().query(query, [profileid]);
    return { profilepic: rows[0] }; // Wrap the result in an object with the expected property
}



module.exports = {
    getSignupdata: async () => getSignup(),
    saveSignupdata: async (email, username, password) => saveSignup(email, username, password),
    getUserByEmaildata: async (email) => getUserByEmail(email),

    //insta post story
    SavepostStoryData: async (userid, storyimg, story) => SavepostStory(userid, storyimg, story),
    getInstastoryData: async () => getInstastory(),


    //add profile on userprofile component based on userids
    SaveprofilpicData: async (profileid, profileimage) => Saveprofilepic(profileid, profileimage),
    //add profile on userprofile component get api
    getUserProfileData: async (id) => getUserProfile(id),


    //add storys on home component
    AddstorysData: async (cid, simg) => Addstorys(cid, simg),
    //get add storys on home component based on ids
    getAddstoryData: async (cid) => getAddstorys(cid),
    //get storys all users
    getAllStoriesData : async()=>getAllStories(),



    //get  userposts based on ids  userprofile component get posts images
    getUserpostsbyIdData: async (id) => getUserpostsbyId(id),
    getuserpostsData: async () => getUserposts(),
        //search user profile
    getsearchprofilesData: async () => getsearchprofiles(),

    //search post storys profile username
    searchPostsData: async (username) => searchPosts(username),
    //search user profile
    //searchUserProfilesData : async(username) => searchUserProfiles(username),

    //for profile pic update in profile component
    updateProfilePicData: async (profileid, profileimage) => updateProfilePic(profileid, profileimage),

    searchprofilename: async (id) => searchprofilename(id),
    searchstoriesget: async (cid) => searchstoriesget(cid),
    getCustomProfileData: async (id) => getCustomProfileData(id),

}
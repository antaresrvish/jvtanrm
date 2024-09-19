const { db } = require('./config/db.js');
async function authUser(email, password){
  try {
    await db.execute("SELECT * FROM users WHERE email = ?",[email], function(ex, result, fields)
      {
        if (ex) throw ex;

        if(result.length === 0){
          console.log('cannot find user');
          return false;
        }

        const user = result[0];
        if(password == user.password){
          console.log('okay');
        }else{
          console.log("password wrong");
        }
      }
    );
  }
  catch(ex){
    
  }
}

authUser('test', '1234');

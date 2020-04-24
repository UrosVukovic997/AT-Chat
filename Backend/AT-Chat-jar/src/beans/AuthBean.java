package beans;

import java.util.ArrayList;

import javax.ejb.LocalBean;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import data.UsersData;
import exceptions.UserRegistrationException;
import model.User;

/**
 * Session Bean implementation class RegistrationBean
 */

@LocalBean
@Path("/user")

public class AuthBean {

    /**
     * Default constructor. 
     */
    public AuthBean() {
        // TODO Auto-generated constructor stub
    }
    
	@POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public String registerUser(User user) throws UserRegistrationException  {
        for (User u : UsersData.getInstance().getAllUsers()) {
            if (u.getUsername().equals(user.getUsername())) throw new UserRegistrationException();
        }
        UsersData.getInstance().getAllUsers().add(user);
        System.out.println("New user registered");
        return "Registered successfully";
    }
	
	@POST
	@Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String login(User user) {
		for (User currentUser : UsersData.getInstance().getAllUsers()) {
            if (user.getUsername().equals(currentUser.getUsername()) && user.getPassword().equals(currentUser.getPassword())) {
                                
                for(User onlineUser : UsersData.getInstance().getOnlineUsers()) {
                	if(onlineUser.getUsername().equals(currentUser.getUsername())) {
            			return "Already logged in";
                	}
                }
                UsersData.getInstance().getOnlineUsers().add(user);
    				return "Logged in successfully";

            }
		}
		
		return "Logging in failed";

	}
	
	@DELETE
	@Path("/logout")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public String logout(User user) {
        User userFound = null;
        for (User currentUser : UsersData.getInstance().getOnlineUsers()) {
            if (user.getUsername().equals(currentUser.getUsername())) {
                        userFound = currentUser;
            }
        }
                  
        if (userFound != null) {
        	UsersData.getInstance().logout(userFound);
        	return userFound.getUsername() + " successfully logged out";
        }
    	return "User is not logged in";

    }
	
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<String> getAllOnlineUsers(){
		ArrayList<String> returnValue = new ArrayList<>();
		for(User currentUser : UsersData.getInstance().getOnlineUsers()) {
			returnValue.add(currentUser.getUsername());
		}
	return returnValue;
	}
}

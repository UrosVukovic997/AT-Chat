package beans;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;

/**
 * Session Bean implementation class ChatBean
 */
@Stateless
@LocalBean
public class ChatBean implements ChatBeanRemote, ChatBeanLocal {

    /**
     * Default constructor. 
     */
    public ChatBean() {
        // TODO Auto-generated constructor stub
    }

}

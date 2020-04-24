package ws;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

@Singleton
@ServerEndpoint("/ws/{user}")
@LocalBean
public class WSEndPoint {

static Map<String, Session> sessions = new ConcurrentHashMap<>();
	
	@OnOpen
	public void onOpen(@PathParam("user") String user, Session session) {
		sessions.put(user, session);
	}
	

	@OnMessage
	public void echoTextMessage(String msg) {
		
	}

	
}

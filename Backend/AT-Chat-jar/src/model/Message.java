package model;

public class Message {

    private String receiver;
    private String sender;
    private String content;
    private String subject;
    
    
    
	public Message() {
		super();

	}
	public Message(String receiver, String sender, String content, String subject) {
		super();
		this.receiver = receiver;
		this.sender = sender;
		this.content = content;
		this.subject = subject;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
    
    
}

package com.example.backendjuridique.response;

public class LoginResponse {

	    String message;
	    Boolean status;
	    String userType;
        String name;
	    public String getMessage() {
	        return message;
	    }

	    public void setMessage(String message) {
	        this.message = message;
	    }

	    public Boolean getStatus() {
	        return status;
	    }
	    public String getName() {
	        return name;
	    }


	    public void setStatus(Boolean status) {
	        this.status = status;
	    }
	    public String getUserType() {
	        return userType;
	    }

	    public void setUserType(String userType) {
	        this.userType = userType;
	    }
       public void setName(String name) {
    	   this.name=name;
       }
       
	    public LoginResponse(String message, Boolean status) {
	        this.message = message;
	        this.status = status;
	    }
	    public LoginResponse(String message, Boolean status ,String userType,String name) {
	        this.message = message;
	        this.status = status;
	        this.userType=userType;
	        this.name=name;
	    }
	}

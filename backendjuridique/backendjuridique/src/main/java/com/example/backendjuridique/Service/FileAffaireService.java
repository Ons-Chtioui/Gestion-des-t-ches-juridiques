package com.example.backendjuridique.Service;



import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.backendjuridique.Entity.FileAffaire;
import com.example.backendjuridique.respository.FileAffaireRepository;

@Service
public class FileAffaireService {
	
	
	 @Autowired
	    private FileAffaireRepository fileRepository;
	 
	 
	 
	 public FileAffaire ajouterfile(FileAffaire file) {
	    	file.setDateCreation(new Date());
	        return fileRepository.save(file);
	    }
	    
	    
	    public FileAffaire getfile(Long id) {
	        
	        return fileRepository.findById(id).get();
	    }
	    
	    public List<FileAffaire> getallfiles(){
	    	return fileRepository.findAll();
	    }
	    
	   
	    public Optional<FileAffaire> getFileById(Long id) {
	        return fileRepository.findById(id);
	    }

    public List<FileAffaire> getFilesByAffaireId(Long affaireId) {
        return fileRepository.findByAffaireId(affaireId);
    }
}

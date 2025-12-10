package com.example.backendjuridique.Service;



import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backendjuridique.Entity.File;
import com.example.backendjuridique.respository.FileRepository;

@Service
public class FileService {
	
	
	 @Autowired
	    private FileRepository fileRepository;
	 
	 
	 
	    public File ajouterfile(File file) {
	    	file.setDateCreation(new Date());
	        return fileRepository.save(file);
	    }
	    
	    public File getfile(Long id) {
	        
	        return fileRepository.findById(id).get();
	    }
	    
	    public List<File> getallfiles(){
	    	return fileRepository.findAll();
	    }
	    
	   
	    public Optional<File> getFileById(Long id) {
	        return fileRepository.findById(id);
	    }

    public List<File> getFilesByAffaireId(Long affaireId) {
        return fileRepository.findByAffaireId(affaireId);
    }
}

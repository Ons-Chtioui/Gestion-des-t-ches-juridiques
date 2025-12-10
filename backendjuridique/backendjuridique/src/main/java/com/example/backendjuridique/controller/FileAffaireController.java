package com.example.backendjuridique.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backendjuridique.Entity.AffaireInterne;
import com.example.backendjuridique.Entity.FileAffaire;
import com.example.backendjuridique.Service.FileAffaireService;
import com.example.backendjuridique.response.FileUploadResponse;
import com.example.backendjuridique.respository.FileAffaireRepository;

import lombok.RequiredArgsConstructor;
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class FileAffaireController {
	@Autowired
    private FileAffaireService fileService;
    private  FileAffaireRepository fileRepository; // Injection de dépendance pour FileRepository
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("interne/uploadfile")
    public ResponseEntity<FileUploadResponse> uploadFile(@RequestParam("file") MultipartFile file,
                                                          @RequestParam("dossierId") Long id) // Utilisation de la même variable "id" que dans le paramètre de la méthode
            throws IOException {

        // Création d'une instance d'Affaire avec l'ID "id"
        AffaireInterne affaire = new AffaireInterne();
        affaire.setId(id);

        // Enregistrer le fichier avec le service FileService
        FileAffaire savedFile = fileService.ajouterfile(FileAffaire.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .FileAffaireContent(file.getBytes())
                .affaire(affaire) // Associer l'affaire au fichier
                .build());

        return ResponseEntity.status(HttpStatus.OK)
                .body(new FileUploadResponse("File uploaded successfully: " + savedFile.getName()));
    }
   
    @GetMapping("interne/getfileparid/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable("id") Long id) throws IOException {
        Optional<FileAffaire> dbFile = fileService.getFileById(id);

        if (dbFile.isPresent()) {
            // Renvoyer le contenu du fichier avec le bon type MIME
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.valueOf(dbFile.get().getType()))
                    .body(dbFile.get().getFileAffaireContent());
        } else {
            // Renvoyer une réponse 404 si le fichier n'est pas trouvé
            return ResponseEntity.notFound().build();
        }
    }
    @CrossOrigin(origins = "!!!!!!!!!!!!!!http://localhost:5173")
    @GetMapping("interne/getfilesbyaffaire/{affaireId}")
    public List<FileAffaire> getFilesByAffaireId(@PathVariable("affaireId") Long affaireId) {
        return fileService.getFilesByAffaireId(affaireId);
    }

    @GetMapping("interne/getfiles")
    public List<FileAffaire> getAllFiles() {
        return fileRepository.findAll();
    }
}

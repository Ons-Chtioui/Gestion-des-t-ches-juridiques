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

import com.example.backendjuridique.Entity.Affaire;
import com.example.backendjuridique.Entity.File;
import com.example.backendjuridique.Service.FileService;
import com.example.backendjuridique.response.FileUploadResponse;
import com.example.backendjuridique.respository.FileRepository;

import lombok.RequiredArgsConstructor;
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class FileController {
	@Autowired
    private FileService fileService;
    private  FileRepository fileRepository; // Injection de dépendance pour FileRepository
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/uploadfile")
    public ResponseEntity<FileUploadResponse> uploadFile(@RequestParam("file") MultipartFile file,
                                                          @RequestParam("dossierId") Long id) // Utilisation de la même variable "id" que dans le paramètre de la méthode
            throws IOException {

        // Création d'une instance d'Affaire avec l'ID "id"
        Affaire affaire = new Affaire();
        affaire.setId(id);

        // Enregistrer le fichier avec le service FileService
        File savedFile = fileService.ajouterfile(File.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .fileContent(file.getBytes())
                .affaire(affaire) // Associer l'affaire au fichier
                .build());

        return ResponseEntity.status(HttpStatus.OK)
                .body(new FileUploadResponse("File uploaded successfully: " + savedFile.getName()));
    }
   
    @GetMapping("/getfileparid/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable("id") Long id) throws IOException {
        Optional<File> dbFile = fileService.getFileById(id);

        if (dbFile.isPresent()) {
            // Renvoyer le contenu du fichier avec le bon type MIME
            return ResponseEntity
                    .ok()
                    .contentType(MediaType.valueOf(dbFile.get().getType()))
                    .body(dbFile.get().getFileContent());
        } else {
            // Renvoyer une réponse 404 si le fichier n'est pas trouvé
            return ResponseEntity.notFound().build();
        }
    }
    @CrossOrigin(origins = "!!!!!!!!!!!!!!http://localhost:5173")
    @GetMapping("/getfilesbyaffaire/{affaireId}")
    public List<File> getFilesByAffaireId(@PathVariable("affaireId") Long affaireId) {
        return fileService.getFilesByAffaireId(affaireId);
    }

    @GetMapping("/getfiles")
    public List<File> getAllFiles() {
        return fileRepository.findAll();
    }
}

## Innehåll

 * Introduktion
 * Externa Moduler
 * Installation
 * Konfiguration


## Introduktion

Denna modul består av ett "Custom Block" som låter användare spela spelet "Memory"

## Externa moduler

Denna modul kräver inga externa moduler utanför Drupals "Core"-moduler.
För att stödja användning av URL-bilder krävs dock en installering av följande modul: https://www.drupal.org/project/media_entity_remote_image

## Installation

Guide för modulinstallation i Drupal Site:
Förutsättningar: Modulmappen måste existera lokalt på din dator i .ZIP eller .RAR-format
1. Logga in på adminkontot för din Drupal Site
2. Navigera till “Manage”-menyn
3. Välj “Extend”-fliken
4. Klicka på knappen “Add new module”
5. Lägg till modulmappen genom att klicka “Välj fil” och ange modulmappen från den lokala filstrukturen
6. Klicka “Continue”
7. Under “Next Steps”, klicka “Enable newly added modules”
8. I sökfältet, sök på “Concentration game”
9. Markera rutan för “Concentration game” 
10. Klicka “Install” längst ner på sidan
11. Klar med installation

Guide för avinstallation av modul i Drupal Site:
1. Logga in på adminkontot för din Drupal Site
2. Navigera till “Manage”-menyn
3. Välj “Extend”-fliken
4. På Extend-sidan, välj fliken “Uninstall”
5. I sökrutan, ange “Concentration game”
6. Klicka “Uninstall”
7. Klicka “Uninstall” längst ner på sidan
8. Klar med avinstallation

## Konfiguration

#Grundkonfiguration för Memory-modul i Drupal Site
Dessa instruktioner är ämnade till att skapa ett content block för att själva memoryt ska kunna synas på en eller flera Drupalsidor.

Förutsättningar:Inloggad på adminsidan och installerad Memory-modul
 
1. I Manage-menyn, klicka “Structure”

2. Klicka “Block Layout”

3. Klicka “Custom block library

4. Klicka “Concentration”

5. Fyll i de fält som är markerade med en röd stjärna(obligatoriska) samt “Hints” och “Play Again” med passande värden. 
   Vad som är passande värden ska kunna avgöras genom att läsa fältbeskrivningarna.

6. Klicka “Save” längst ner på sidan

7. Navigera till “Block layout”

8. Välj passande block att lägga ut Memoryt på, förslagsvis “Content”

9. Klicka “Place block” på önskat val

9. I sökrutan, ange Memory-blockets “Block Description” som angavs i punkt 5.

10. Klicka “Place block” när korrekt block lokaliserats

11. I denna meny kan man ange för vilka användarroller, sidotyper eller specifika drupalsidor som Memoryt ska vara synligt på. Om inga speciella önskemål om dessa         saker finns så kan de lämnas tomma. 

12. Klicka “Save block”

13. Memory ska nu vara synligt på angivna sidor för angivna användare



#Guide för att lägga till stöd för URL-bilder: 
1. Följ stegen för modulinstallation, men med följande modul:
https://www.drupal.org/project/media_entity_remote_image

2. I Manage-menyn, välj “Reports”
3. I “Reports”, välj “field list”
4. I “field list”, välj “Concentration” under valfritt fält i “Used In” kolumnen
5. Välj fältet med label “Game Images” och klicka på knappen “Edit” längst till höger
6. I fältet “Reference type”, under rubriken “Media type”, markera rutan “Remote image”
7. Scrolla längst ner och klicka på knappen “Save Settings”

Notera: För att lägga till URL-bilder till Memory-modulen måste de först läggas till i “Media Library”



#Guide för att lägga till URL-bilder:
Förutsättningar: “Stöd för URL-bilder”-guide genomförd

1. I Manage-menyn, klicka “Content”
2. Välj fliken “Media”, klicka “Add media”
3. Klicka “Remote image”
4. Fyll i relevanta textfält
5. Klicka “Save” längst ner på sidan
6. Bilden är nu tillagd i Media Library för din Drupal Site. 
7. För att generera thumbnail för URL-bilden navigerar du till “Manage->Configuration->Media->Media entity remote image settings”, markerar “Generate Thumbnail            Previews” och klickar på “Save configuration”.
8. Klar, nu kan URL-bilderna som lagts till i Media Library användas för Memoryts “Game images” och “Face down image”.


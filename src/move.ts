// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-plusplus */
// Please update this type as same as with the data shape.
type Folder = {
  id: string;
  name: string;
  files: File[];
};
type File = {
  id: string;
  name: string;
};
type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  //  Destination Folder'ına eklenicek file'ı burda oluşturdum ki loop'un içinde ekleyebiliyim.
  let targetedFile;
  for (let i = 0; i < list.length; i++) {
    const selectedFolder = list[i];
    if (selectedFolder.id === source) {
      throw new Error('You cannot move a folder');
    }
    for (let j = 0; j < selectedFolder.files.length; j++) {
      const currentFileID = selectedFolder.files[j].id;
      const currentFiles: File[] = selectedFolder.files;
      if (destination === currentFileID) {
        throw new Error('You cannot specify a file as the destination');
      }
      if (source === currentFileID) {
        targetedFile = selectedFolder.files[j];
        //  Önce targetedFile'ın indexini bulup sonrasında splice ile Files array'inden çıkardım.
        const targetedFileIndex = currentFiles.indexOf(targetedFile);
        currentFiles.splice(targetedFileIndex, 1);
      }
    }

    if (selectedFolder.id === destination) {
      //  target File'ın tipini File olması için typeguardingden geçirdim sonrasındada destination folder'ının files'ına ekledim.
      if (!(targetedFile?.id === undefined)) selectedFolder.files.push(targetedFile);
    }
  }
  return list;
}

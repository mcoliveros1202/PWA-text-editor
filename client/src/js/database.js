import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
  
  export const getDb = async () => {
    console.error('getDb not implemented')

    // Create db connect and select version
    const jateDb = await openDB('jate_db', 1);

    // new transaction and select db and data privileges
    const tx = jateDb.transaction('jate_db', 'readonly');

    // Open desired object store
    const store = tx.objectStore('jate');
    
    // Use .getAll() method to get all data in db
    const request = store.getAll();

    // Get confirmation
    const result = await request;
    console.log('result.value', result);
    return result;
};

export const putDb = async (content) => {
  console.error('putDb not implemented')

  // Create db connection with selected version
  const jateDb = await openDB('jate_db', 1);

  // create new transaction and specify the db and data privileges
  const tx = jateDb.transaction('jate_db', 'readwrite');

  // open desired object store
  const store = tx.objectStore('jate');

  // Use .add() method on the store and pass in content
  const request = store.put({ content: content });

  // Confirmation of request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};


initdb();
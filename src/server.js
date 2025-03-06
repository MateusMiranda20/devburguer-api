import app from './app'
import 'dotenv/config';


const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Server is running ar port 4000 ..'))

# Teoretiska Resonemang

## 1. Motivera ditt val av databas

**Val: MongoDB (NoSQL)**

**Anledningar:**
- **Flexibel schema**: Kan enkelt lägga till nya fält utan migrationer
- **Bra för Node.js**: Mongoose ODM fungerar utmärkt med TypeScript
- **Enklare att komma igång**: Ingen tabell-struktur att definiera i förväg
- **Dokument-orienterad**: Varje task/user är ett komplett dokument

## 2. Redogör vad de olika teknikerna gör

**Express**: Web framework för att hantera HTTP requests/routes
**TypeScript**: Ger typ-säkerhet och bättre utvecklarupplevelse
**Mongoose**: ODM (Object Document Mapper) för MongoDB
**bcrypt**: Krypterar lösenord med hash + salt
**dotenv**: Hanterar miljövariabler från .env fil

## 3. Redogör översektligt hur applikationen fungerar

1. **Server startar** → Ansluter till MongoDB
2. **Client skickar request** → Express router matchar endpoint
3. **Validering** → Mongoose schema validerar data
4. **Business logic** → Controllers hanterar operationer
5. **Database interaction** → Mongoose sparar/läser data
6. **Response** → JSON svar tillbaka till client

**Flow example (skapa task):**
Client → POST /api/tasks → Validering → Kolla assignedTo user → Spara i DB → Skicka tillbaka task


# Development
npm run dev

# Add sample data to database
npm run seed

# Build for production
npm run build

# Run in production
npm start
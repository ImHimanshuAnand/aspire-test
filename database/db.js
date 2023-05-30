const PORT = process.env.PORT || 4000;

export const mongooseConnect = mongoose.connect(process.env.DB_URL).then((res) => { console.log("DB connected") }).catch(err => { console.log("DB not connected") })
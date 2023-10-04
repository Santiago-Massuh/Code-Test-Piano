const fs = require("fs");

// Reed CVS Files
const fileAPath = "path/to/file_a.csv";
const fileBPath = "path/to/file_b.csv";

const usersA = {};
const usersB = {};

const readCSV = (filePath, callback) => {
  const rows = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      rows.push(row);
    })
    .on("end", () => {
      callback(rows);
    });
};

readCSV(fileAPath, (data) => {
  data.forEach((row) => {
    usersA[row.user_id] = { email: row.email };
  });
});

readCSV(fileBPath, (data) => {
  data.forEach((row) => {
    const user_id = row.user_id;
    usersB[user_id] = { first_name: row.first_name, last_name: row.last_name };
  });

  // Generate the combined file
  const mergedData = [];
  for (const user_id in usersB) {
    if (usersA[user_id]) {
      const { email } = usersA[user_id];
      const { first_name, last_name } = usersB[user_id];
      mergedData.push({ user_id, email, first_name, last_name });
    }
  }

  // Save the combined file in CSV format
  const mergedFilePath = "path/to/merged_file.csv";
  const csvWriter = createCsvWriter({
    path: mergedFilePath,
    header: [
      { id: "user_id", title: "user_id" },
      { id: "email", title: "email" },
      { id: "first_name", title: "first_name" },
      { id: "last_name", title: "last_name" },
    ],
  });

  csvWriter
    .writeRecords(mergedData)
    .then(() => console.log("Combined file saved successfully."));
});

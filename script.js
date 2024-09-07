function generateSentence() {
    const countryInput = document.getElementById('country').value;

    if (!countryInput) {
        document.getElementById('generated-sentence').textContent = 'Please enter a country.';
        return;
    }

    // Fetch data from the REST Countries API
    fetch(`https://restcountries.com/v3.1/name/${countryInput}?fullText=true`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const countryInfo = data[0];
                const countryName = countryInfo.name.common;
                const nationality = countryInfo.demonyms.eng.m; // Male demonym (e.g., 'Australian')
                const language = Object.values(countryInfo.languages)[0]; // Get first language
                const capital = countryInfo.capital[0]; // Get first capital
                const population = countryInfo.population.toLocaleString(); // Format population

                const sentence = `I come from ${countryName}, so I'm ${nationality}, and my first language is ${language}. The capital is ${capital}, which has a population of more than ${population} people.`;
                document.getElementById('generated-sentence').textContent = sentence;
            } else {
                document.getElementById('generated-sentence').textContent = "Sorry, we couldn't find information for that country.";
            }
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            document.getElementById('generated-sentence').textContent = "There was an error fetching the country data.";
        });
}

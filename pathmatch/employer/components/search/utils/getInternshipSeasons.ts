export const getInternshipSeasons = (seasons: string[], years: string[]) => {

    const internshipSeasons: string[] = [];

    seasons.forEach((season) => {
        if(season === 'ASAP') {
            internshipSeasons.push('ASAP');
        }else{
            years.forEach((year) => {
                internshipSeasons.push(`${season}-${year}`);
            });
        }
    });

    return internshipSeasons;
} 
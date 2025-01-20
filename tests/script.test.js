// Mock data that resembles the JSON structure
const mockProjects = [
    { "s.no": 0, "percentage.funded": 186, "amt.pledged": 15283 },
    { "s.no": 1, "percentage.funded": 102, "amt.pledged": 6859 },
    { "s.no": 2, "percentage.funded": 5778, "amt.pledged": 17906 },
    { "s.no": 3, "percentage.funded": 191, "amt.pledged": 67081 },
    { "s.no": 4, "percentage.funded": 34, "amt.pledged": 32772 },
    { "s.no": 5, "percentage.funded": 114, "amt.pledged": 2065 },
  ];
  
  const getPaginatedData = (data, page, recordsPerPage) => {
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return data.slice(startIndex, endIndex);
  };
  
  // Mock table update function that returns the HTML structure
  const renderTable = (data) => {
    return data.map(project => {
      return `<tr>
        <td>${project["s.no"]}</td>
        <td>${project["percentage.funded"]}</td>
        <td>${project["amt.pledged"]}</td>
      </tr>`;
    }).join('');
  };
  
  describe("Pagination and rendering tests", () => {
    test("Paginated data returns the correct records", () => {
      const recordsPerPage = 2;
  
      // First page
      let pageData = getPaginatedData(mockProjects, 1, recordsPerPage);
      expect(pageData).toEqual([
        { "s.no": 0, "percentage.funded": 186, "amt.pledged": 15283 },
        { "s.no": 1, "percentage.funded": 102, "amt.pledged": 6859 },
      ]);
  
      // Second page
      pageData = getPaginatedData(mockProjects, 2, recordsPerPage);
      expect(pageData).toEqual([
        { "s.no": 2, "percentage.funded": 5778, "amt.pledged": 17906 },
        { "s.no": 3, "percentage.funded": 191, "amt.pledged": 67081 },
      ]);
  
      // Third page
      pageData = getPaginatedData(mockProjects, 3, recordsPerPage);
      expect(pageData).toEqual([
        { "s.no": 4, "percentage.funded": 34, "amt.pledged": 32772 },
        { "s.no": 5, "percentage.funded": 114, "amt.pledged": 2065 },
      ]);
    });
  
    test("Rendering table generates correct HTML", () => {
      const dataToRender = [
        { "s.no": 0, "percentage.funded": 186, "amt.pledged": 15283 },
        { "s.no": 1, "percentage.funded": 102, "amt.pledged": 6859 },
      ];
  
      const expectedHTML = `
        <tr>
        <td>0</td>
        <td>186</td>
        <td>15283</td>
      </tr><tr>
        <td>1</td>
        <td>102</td>
        <td>6859</td>
      </tr>
      `.trim();
  
      const result = renderTable(dataToRender).trim();
      expect(result).toBe(expectedHTML);
    });
  });
  
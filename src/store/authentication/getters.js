export const getters = {
  getCpfPreRegistration: (state) => state.preRegistration.cpf,
  getHospitals: (state) => state.preRegistration.hospitals,
  getProfessionalCouncils: (state) =>
    state.preRegistration.professionalCouncils,
  getOccupations: (state) => state.preRegistration.occupations,
  hospitalSelected: (state) => state.hospitalSelected,
  hospitalsUser: (state) => state.hospitalsUser,
  mode: (state) => state.mode,
  user: (state) => state.user,
  menu: (state) => state.menu,
  getVisitList: (state) => state.listVisitas,
};

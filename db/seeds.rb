# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


job_roles = [
  'Juiz',
  'Desembargador',
  'Promotor de Justiça',
  'Procurador de Justiça',
  'Escrevente',
  'Oficial de Justiça',
  'Técnico Judiciário',
  'Analista Judiciário',
  'Assessor de Juiz',
  'Diretor de Secretaria',
  'Conciliador',
  'Defensor Público',
  'Advogado da União',
  'Analista Administrativo',
  'Secretário de Audiências',
  'Assessor Jurídico',
  'Assistente Social',
  'Psicólogo Judiciário'
]

job_roles.each do |role|
  JobRole.find_or_create_by!(title: role)
end

# =======================================================

workspaces = [
  "Tribunal de Justiça de São Paulo",
  "Tribunal de Justiça do Rio de Janeiro",
  "Tribunal de Justiça de Minas Gerais",
  "Tribunal de Justiça do Rio Grande do Sul",
  "Tribunal de Justiça da Bahia",
  "Tribunal de Justiça do Paraná",
  "Tribunal de Justiça de Pernambuco",
  "Tribunal de Justiça do Ceará",
  "Tribunal de Justiça de Santa Catarina",
  "Tribunal de Justiça do Maranhão",
  "Tribunal de Justiça do Pará",
  "Tribunal de Justiça do Amazonas",
  "Tribunalworkspaces de Justiça de Goiás",
  "Tribunal de Justiça de Alagoas",
  "Tribunal de Justiça do Piauí",
  "Tribunal de Justiça da Paraíba",
  "Tribunal de Justiça do Rio Grande do Norte",
  "Tribunal de Justiça do Amapá",
  "Tribunal de Justiça de Sergipe",
  "Tribunal de Justiça de Rondônia",
  "Tribunal de Justiça de Roraima",
  "Tribunal de Justiça do Acre",
  "Tribunal de Justiça do Tocantins",
  "Tribunal de Justiça do Distrito Federal e Territórios"
]

# =======================================================

genders = [
  "Masculino",
  "Feminino"
]

genders.each do |gender| 
  Gender.create(title: gender)
end

# =======================================================

marital_states = [
  "Solteiro(a)",
  "Casado(a)",
  "Divorciado(a)"
]

marital_states.each do |state| 
  MaritalState.create(title: state)
end
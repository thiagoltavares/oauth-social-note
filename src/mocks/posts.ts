import { IPostData } from '../types';

export const initialPosts: IPostData[] = [
  {
    id: '1',
    title: 'You are not my father',
    content:
      'Lucas ipsum dolor sit amet cerean lama nute ubese fett jodo nar karrde paaerduag nomi. Valorum selkath raymus tenel opress corellia raynar.',
    user: {
      uid: '123',
      displayName: 'Luke Skywalker',
      email: 'luke@starwars.com',
      photoURL:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/da407d71-6f77-484f-880a-26eecc18f132/ddf5u0o-9e30258c-2de7-4a00-a787-4b50e41b892f.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZGE0MDdkNzEtNmY3Ny00ODRmLTg4MGEtMjZlZWNjMThmMTMyXC9kZGY1dTBvLTllMzAyNThjLTJkZTctNGEwMC1hNzg3LTRiNTBlNDFiODkyZi5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.sNyb3EJ_awLXp88i1zgfp9_EDEUpM0iYrKO5bsmH3WY',
    },
    stars: 1,
    comments: 12,
  },
  {
    id: '2',
    title: 'The baby Yoda',
    content:
      'Annoo bothan natasi barabel airen melodie chirrpa tyber rahm. Olié antilles kobok opress cerea sunrider. Ruurian zannah kuat lando croke kal',
    user: {
      uid: '456',
      displayName: 'Mandalorian',
      email: 'mandalorian@starwars.com',
      photoURL:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/da407d71-6f77-484f-880a-26eecc18f132/ddkdssr-1c9f72ea-0fff-4864-aff4-dcc167351c7e.jpg/v1/fill/w_1920,h_2058,q_75,strp/mandalorian_by_lucasbsilva_ddkdssr-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0yMDU4IiwicGF0aCI6IlwvZlwvZGE0MDdkNzEtNmY3Ny00ODRmLTg4MGEtMjZlZWNjMThmMTMyXC9kZGtkc3NyLTFjOWY3MmVhLTBmZmYtNDg2NC1hZmY0LWRjYzE2NzM1MWM3ZS5qcGciLCJ3aWR0aCI6Ijw9MTkyMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.lgR_KajnDKTNN5dHVOKFeHlfcdyWVXpB6o9FCa8eNdw',
    },
    stars: 3,
    comments: 0,
  },
];

import React from 'react';
import PageHeader from '../PageHeader/PageHeader';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container-fluid">
      <PageHeader 
        title = "Hikes"
        description = "INTO THE WILD"
      />
      <div className="container">

        <p className="lead mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a lorem a risus aliquam rhoncus id vel nulla. Fusce dictum dolor eros, a aliquam erat congue dapibus. Fusce eu nibh elementum, volutpat sem in, maximus mi. Aenean sit amet dolor pharetra, cursus neque nec, mattis ligula. Fusce in arcu at lacus sodales elementum. Phasellus volutpat lorem mi, in laoreet dui pretium sit amet. Curabitur a urna et nunc malesuada posuere. Sed in erat in nunc tincidunt ullamcorper ut imperdiet enim. Sed nunc justo, consectetur sed vulputate a, venenatis ac justo. Ut mi elit, dictum eget odio et, congue lacinia sem. Praesent laoreet ex scelerisque lacus egestas, ornare dictum leo fermentum. In laoreet augue at tincidunt tempus. Nam quis molestie mauris.

            Nunc id dolor at orci semper molestie. Aliquam tincidunt, diam sit amet ultrices malesuada, felis magna volutpat dui, fermentum tempor tellus lorem eget tellus. Nunc id urna dui. Mauris porta risus a nisi lobortis, id rhoncus augue tristique. Sed tristique aliquam nulla, at posuere felis fringilla ac. Cras lobortis sollicitudin ex nec cursus. Ut cursus ex quam, eget bibendum nibh faucibus et. Sed vel sollicitudin est.

            Aliquam tellus felis, feugiat non enim et, vulputate dignissim justo. Donec id diam erat. Suspendisse a enim lacus. Etiam euismod nisi est, at tincidunt erat tempor tincidunt. Cras posuere nulla mi, eu molestie tellus consequat quis. Vivamus leo arcu, pretium ac viverra a, vestibulum id risus. Suspendisse tincidunt ipsum quis mi efficitur lobortis sit amet quis risus. Morbi ac purus iaculis, viverra neque at, sagittis ante.

            In faucibus ante nisi, eu ullamcorper est pharetra vel. Morbi a molestie lacus, a efficitur dolor. Aenean non euismod arcu. Donec facilisis in mi sit amet finibus. Curabitur a ante nulla. Donec faucibus efficitur mauris, eget pulvinar quam aliquam vel. Donec vitae tristique sem. Etiam at convallis metus, ut lobortis augue. Donec ut felis semper, facilisis orci at, aliquet ligula.

            Curabitur porta justo orci, ut mollis mi tincidunt ullamcorper. Mauris congue aliquet massa, id varius nulla congue ut. Praesent sapien nulla, aliquam luctus elit eget, laoreet auctor dolor. Ut eu sem scelerisque, rhoncus augue a, vulputate nisl. Duis commodo arcu non velit ultrices, id faucibus magna faucibus. Pellentesque purus tellus, tempus elementum consequat id, pharetra eget urna. Morbi eleifend nunc ut interdum commodo. Nam eu sem sodales, ullamcorper nunc et, malesuada purus. Pellentesque auctor arcu eu risus rutrum, vitae mattis sem euismod. Quisque vitae magna augue. Mauris dapibus, orci a vestibulum convallis, ipsum dolor feugiat leo, ultrices rutrum orci arcu quis eros.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
